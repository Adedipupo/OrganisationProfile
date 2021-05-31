"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var user_1 = __importDefault(require("./routes/user"));
var organization_1 = __importDefault(require("./routes/organization"));
var DbConfig_1 = __importDefault(require("./database/DbConfig"));
var testDbConnection_1 = __importDefault(require("./database/testDbConnection"));
dotenv_1.default.config();
var app = express_1.default();
//connect to Mongodb
process.env.NODE_ENV === 'test' ? testDbConnection_1.default() : DbConfig_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/users', user_1.default);
app.use('/api/org', organization_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
