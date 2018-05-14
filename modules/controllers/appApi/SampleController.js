const Controller = require('./Controller')

module.exports = new class SampleController extends Controller {
    index(req , res) {
        res.json({
            success : true,
            foo : 'bar'
        });             
    }
}