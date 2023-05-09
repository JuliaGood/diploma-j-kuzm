const constants = require('./constants')
const express = require('express');
const http = require('http');
const bodyParse = require('body-parser');
const cors = require('cors');
const scheduleController = require('./controllers/ScheduleController');
const roomController = require('./controllers/RoomController');
const historyController = require('./controllers/HistoryController');
const schedulerService = require('./services/SchedulerService');
const wsService = require('./services/WsService');
const databaseService = require('./services/DatabaseService');

const corsOptions = {
  origin: '*'
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParse.json());
app.use(express.static('public'))

const router = express.Router();
app.use('/api', router);

// Create DB connection
const db = databaseService.createConnection();

// Controllers
router.get('/schedules', scheduleController.getSchedules(db));
router.get('/schedules/:scheduleId', scheduleController.getSchedule(db));
router.post('/schedules', scheduleController.addSchedule(db));
router.put('/schedules/:scheduleId', scheduleController.editSchedule(db));
router.delete('/schedules/:scheduleId', scheduleController.deleteSchedule(db));
router.post('/history', historyController.getHistory(db));
router.get('/history/filters', historyController.getHistoryFilters(db));
router.get('/rooms', roomController.getRooms(db));

// Create server
const server = http.createServer(app);

// Run WS server
wsService.runWsServer(server, db);

// Run scheduler
schedulerService.runScheduler(db);

// Run HTTP and WS servers
server.listen(constants.serverPort, () => {
  console.log(`Listening on port ${constants.serverPort}`);
});