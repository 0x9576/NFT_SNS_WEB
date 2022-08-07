if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); //배포후
}
else{
    module.exports = require('./dev'); //배포전
}