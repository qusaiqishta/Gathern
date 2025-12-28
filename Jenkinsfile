pipeline{
    agent any

    parameters{
        string(name:"SPEC", defaultValue:"cypress\e2e\**",description:"enter the script path to execute")
        choice(
            name: "BROWSER",
            choices: ['chrome', 'edge', 'firefox'],
            description: 'Select the browser to run Cypress tests'
        )

        options{
            ansiColor('xterm')
        }
        
        stages {
        
        stage('Build'){
            steps {
                echo "Building the application"
            }
        }
        
        stage('Testing') {
            steps {
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        
        stage('Deploy'){
            steps {
                echo "Deploying"
            }
        }
    }
      post {
        always {  
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
    }
}