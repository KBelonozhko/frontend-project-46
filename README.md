### Hexlet tests and linter status:
[![Actions Status](https://github.com/KBelonozhko/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/KBelonozhko/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/5dd521d3df63eae0008c/maintainability)](https://codeclimate.com/github/KBelonozhko/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5dd521d3df63eae0008c/test_coverage)](https://codeclimate.com/github/KBelonozhko/frontend-project-46/test_coverage)
[![Node CI](https://github.com/KBelonozhko/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/KBelonozhko/frontend-project-46/actions/workflows/nodejs.yml)
---
### Description:
"Difference calculator" is a program that determines the difference between two data structures. Such a mechanism is used when outputting tests or when automatically tracking changes in configuration files.
Utility features:

- Support for different input formats: yaml, json
- Report generation as plain text, stylish and json

---
### System requirements:
`Node.js`. If `Node.js` is not installed, open terminal and run the command:
- For Ubuntu or Ubuntu on Windows

    `curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -`\
`sudo apt install -y nodejs`

- For macOS:

    `brew install nodejs`
---
### Installing and running "Difference calculator":

- To install you will need to enter:\
`git clone https://github.com/KBelonozhko/frontend-project-46.git`\
`make install`\
`npm link`

- To get help, enter the command:\
`gendiff -h`

---

### Demonstration of the app:

#### Recursive comparison (JSON, yaml)

[![asciicast](https://asciinema.org/a/AusnzCI48s4nlknNxiT608ENl.svg)](https://asciinema.org/a/AusnzCI48s4nlknNxiT608ENl)

#### Plain format

[![asciicast](https://asciinema.org/a/fnsv64V3fRih3DVxCCQS5NMHn.svg)](https://asciinema.org/a/fnsv64V3fRih3DVxCCQS5NMHn)

#### Output to json

[![asciicast](https://asciinema.org/a/A30j8JXuO8zkp5DoFMdS3VBsc.svg)](https://asciinema.org/a/A30j8JXuO8zkp5DoFMdS3VBsc)