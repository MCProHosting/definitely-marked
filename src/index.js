var fs = require('fs');
var Section = require('./section');
var MarkedError = require('./error');

// The identifier that delimits between sections.
var sectionDelimiter = '@section';
// A mapping of types to Section handlers.
var sectionTypes = {
    '=': require('./sections/text'),
    '{}': require('./sections/json'),
    '[]': require('./sections/array')
};



/**
 * Represents a new file to be parsed into marked sections
 */
class Marked {
    file: string;
    sections: Object;
    
    constructor () {
        this.sections = {};
    }
    
    /**
     * Parses the file previously selected. Callback is fired with the standard
     * (err, result), where result is the object of sections which were parsed.
     * Same as Marked.sections.
     */
    read (file: string, callback: Function) {
        fs.readFile(file, (function (err: Error, results: Buffer) {
            if (err) {
                return callback(err);
            }
            
            // Parse will return any errors it encounters.
            var errors = this.parse(results.toString());
            callback(errors, this.sections);
        }).bind(this));
    }
    
    /**
     * Parses the string into sections, updating the Marked.sections
     * accordingly and returning errors
     */
    parse (data: string): any {
        var lines = data.split('\n');
        
        // Store the name of the section we're building.
        var buildingName = '';
        // And store data associated with it.
        var buildingStr = '';
        // Keep errors encountered while building this...
        var errors = [];
        
        // Loop through every line.
        lines.forEach((function (line: string) {
            // If this is the start of a new section delaration...
            if (line.startsWith(sectionDelimiter)) {
                this.addSection(buildingName, buildingStr, errors);
                
                // Then update the name this this new named section, and reset
                // the building string.
                buildingName = line.slice(sectionDelimiter.length).trim();
                buildingStr = '';
                return;
            }
            
            // Otherwise, simply add a line.
            buildingStr += '\n' + line;
        }).bind(this));
        
        // Finally, add the last trailing section on the page.
        this.addSection(buildingName, buildingStr, errors);
        
        return errors.length ? errors : undefined;
    }
    
    /**
     * Returns the type of section that the section marker delimits. Created,
     * and its name is set to the section name.
     */
    getSectionFor (name: string): Section {
        for (var key in sectionTypes) {
            if (name.startsWith(key)) {
                var section = new (sectionTypes[key])(name.slice(key.length));
                return section;
            }
        }
        
        throw new MarkedError('Section ' + name + ' does not include a valid type');
    }
    
    /**
     * Creates a new section by the given name, or adds data onto an existing
     * section. Adds an instance to the Error array if something went wrong.
     */
    addSection (name: string, body: string, errors: Array<MarkedError>) {
        if (name.length === 0) {
            return;
        }
        
        name = name.trim();
        body = body.trim();
        
        try {
            if (typeof this.sections[name] === 'undefined') {
                this.sections[name] = this.getSectionFor(name);
            }
            
            this.sections[name].push(body);
        } catch (e) {
            if (e instanceof MarkedError) {
                errors.push(e);
            } else {
                e.throw;
            }
        }
    }
    
    /**
     * Retrieves a section by name.
     */
    getSection (name: string): Section {
        return this.sections[name];
    }
}

module.exports = Marked;
