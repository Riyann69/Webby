const fs = require('fs');

const filename = 'notes.txt';

fs.writeFile(filename, 'Hello! This is the original content. \n', (err) => {
    if (err) return console.log('Write Error:', err);
    console.log('File created and written');

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) return console.log('Read Error:', err);
        console.log('File Content: ', data);

        fs.appendFile(filename, 'This line was appended.\n', (err) => {
            if (err) return console.log('Append Error:', err);
            console.log('Content appended');

            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) return console.log('Read Error:', err);
                console.log('Updated content:', data);

                fs.unlink(filename, (err) => {
                    if (err) return console.log('Delete Error:', err);
                    console.log('File deleted');
                });
            });
        });
    });
});