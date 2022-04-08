import {Any, Inject, Message, WebSocket} from '@cbidigital/heron-common';
import {ReceiveFrom, SocketClose, SocketError, SocketMessage, SocketOpen} from '@cbidigital/heron-realtime';
import {TodoRepository} from '../features/todos/domain';

@WebSocket('t2')
export class Ws2Controller {
  constructor(@Inject('todo.provider') private _repo: TodoRepository) {
  }

    @ReceiveFrom('m1')
  message1(message: Message<Any>) {
    console.log(`handled message1 ${message}`);
    return message.data;
  };

    @ReceiveFrom('m2')
    message2(message: SocketMessage<Any>) {
      console.log(`handled message2 ${message}`);
      return message.data;
    };
}
