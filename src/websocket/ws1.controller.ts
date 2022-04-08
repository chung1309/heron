import {Any, Guard, Inject, WebSocket} from '@cbidigital/heron-common';
import {
  ReceiveFrom,
  ReplyMethod,
  SendTo,
  SocketClose,
  SocketError,
  SocketIO,
  SocketOpen,
} from '@cbidigital/heron-realtime';
import {TodoRepository} from '../features/todos/domain';

@WebSocket('t1')
@Guard({'roles': ['admin']})
export class Ws1Controller {
  constructor(@Inject('todo.provider') private _repo: TodoRepository) {
  }

    @ReceiveFrom('m1', ReplyMethod.ACKNOWLEDGEMENT)
    @Guard({'roles': ['admin']})
  async message1(message: Any): Promise<Any> {
    console.log(`handled message1 ${message}`);
    return message;
  };

    @ReceiveFrom('m2', ReplyMethod.BROADCAST)
    async message2(message: Any): Promise<Any> {
      console.log(`handled message2 ${message}`);
      return message;
    };

    @ReceiveFrom('m3', ReplyMethod.EVENT)
    @SendTo({event: 'm1:result'})
    @SendTo({event: 'm1:result2222'})
    async message3(message: Any): Promise<Any> {
      console.log(`handled message3 ${message}`);
      return message;
    };

    @ReceiveFrom('m4', ReplyMethod.LOCAL)
    async message4(message: Any): Promise<Any> {
      console.log(`handled message4 ${message}`);
      return message;
    };

    @ReceiveFrom('m4', ReplyMethod.MANUAL)
    async message5(message: Any, socket: SocketIO): Promise<Any> {
      // logic here
      // handle manual reply data
      socket.emit('m4:result', message);
    };

    @SocketError()
    async error(data: Any): Promise<Any> {
      console.log('//error action here!');
      return 'error';
    }

    @SocketOpen()
    async open(socket: SocketIO): Promise<Any> {
      console.log('//connected action here');
      return 'open';
    }

    @SocketClose()
    async close(data: Any): Promise<Any> {
      console.log('//socket closed');
      return 'close';
    }
}
