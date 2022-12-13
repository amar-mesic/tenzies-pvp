module.exports = {
    apps: [
        {
            name: 'tenzies-pvp',
            // possibile path: ./server/build/index.js
            script: './build/index.js',
        },
    ],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-54-243-86-231.compute-1.amazonaws.com',
            key: '~/.ssh/amar-first-server-key-pair.cer',
            ref: 'origin/master',
            repo: 'git@github.com:amar-mesic/tenzies-pvp.git',
            path: '/home/ubuntu/code-projects/tenzies-pvp/',
            // cd to server because we have both client and server in the same repo
            'post-deploy':
                'cd server && npm install && pm2 startOrRestart ecosystem.config.js',
        },
    },
}
