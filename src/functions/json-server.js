// functions/json-server.js

const { spawn } = require('child_process');

exports.handler = async (event, context) => {
    const child = spawn('json-server', ['--watch', 'db.json']);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('error', (error) => {
        console.error(`error: ${error.message}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    return {
        statusCode: 200,
        body: 'JSON Server is running!',
    };
};
