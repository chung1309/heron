import {
    Any,
    Consumer,
    EventName,
    Inject,
    IntervalService,
    Logger,
    Message,
    OnStart,
    PreDestroy,
    Publisher,
    Service,
    MessagingService
} from '@cbidigital/heron-common';
import { TodoRepository } from '../features/todos/domain';

@IntervalService(1000)
export class TestIntervalService {
    i = 0;
    private _logger = new Logger(TestIntervalService.name);

    @OnStart()
    start = async () => {
        this._logger.info('Total sheep counted :' + this.i);
        this.i = this.i + 1;
    };
}

@MessagingService()
@EventName('test-messaging')
export class TestMessagingService {
    constructor(@Inject('todo.provider') private _repo: TodoRepository) {
    }

    @Publisher()
    async count(message: Message<Any>) {
        console.log(message.data);
    };

    @Consumer()
    async consume(message: Message<Any>) {
        console.log(message.data);
    }

    @OnStart()
    async start() {
        console.log('brum burm starting...');
    };

    @PreDestroy()
    async destroy() {
        console.log('stopping...');
    };
}

@Service()
export class TestService {
    constructor(@Inject('todo.provider') private _repo: TodoRepository) {
    }

    @Consumer()
    async consume(message: Message<Any>) {
        console.log(message.data);
    }

    @OnStart()
    async start() {
        console.log('brum brum starting....');
    };

    @PreDestroy()
    async destroy() {
        console.log('stopping...');
    };
}