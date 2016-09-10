function build () {
  cd $1
  echo "${1} : npm run build"
  npm run build
  cd ../
}

function install () {
  cd $1
  echo "${1} : npm install"
  rm -rf node_modules
  npm install
  cd ../
}

function pretest () {
  install $1
  build $1
}

pretest util
pretest exec
