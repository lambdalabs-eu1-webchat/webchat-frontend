import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { fetchAllUsers } from './store/actions/users';
import { loginRequest, registerUser, logout } from './store/actions/auth';
import { DOMAIN, SOCKET } from './utils/paths';
import {
  addActiveChats,
  addQueuedChats,
  addMessage,
  addQueuedChat,
  removeQueuedChat,
} from './store/actions/chat';

import NavBar from './components/NavBar';
import Logout from './components/Logout';
import HomePage from './views/HomePage';
import Chat from './views/Chat';
import Login from './views/Login';
import Register from './views/Register';
import './App.css';

import ChatScreen from './components/ChatScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  state = {
    socketInit: true,
  };

  componentDidUpdate() {
    const token = localStorage.getItem('token');
    if (token && this.state.socketInit) {
      this.setState({ socketInit: false });
      const socket = socketIOClient(DOMAIN);
      socket.on(SOCKET.CONNECTION, () => {
        // set up listeners
        socket.on(SOCKET.MESSAGE, ({ chat_id, message }) => {
          this.props.dispatchAddMessage(chat_id, message);
        });
        socket.on(SOCKET.ACTIVE_CHATS, chatLogs => {
          this.props.dispatchAddActiveChats(chatLogs);
        });
        socket.on(SOCKET.QUEUED_CHATS, chatLogs => {
          this.props.dispatchAddQueuedChats(chatLogs);
        });
        socket.on(SOCKET.ADD_QUEUED, chatLog => {
          this.props.dispatchAddQueuedChat(chatLog);
        });
        socket.on(SOCKET.REMOVE_QUEUED, chat_id => {
          this.props.dispatchRemoveQueuedChat(chat_id);
        });
        // socket.on(SOCKET.CHATLOG, chatLog => {});
        socket.emit(SOCKET.LOGIN, token);
      });
    }
  }

  render() {
    const {
      state,
      dispatchLoginRequest,
      dispatchRegisterUser,
      dispatchFetchAllUsers,
      dispatchLogout,
    } = this.props;
    return <ChatScreen ticket={x} />;
    return (
      <div className='App'>
        <NavBar loggedIn={Boolean(state.authToken)} />
        <Route
          exact
          path='/'
          render={props => (
            <HomePage
              {...props}
              loggedIn={Boolean(state.authToken)}
              fetchAllUsers={dispatchFetchAllUsers}
            />
          )}
        />
        <Route
          path='/login'
          render={props => (
            <Login
              {...props}
              loggedIn={Boolean(state.authToken)}
              loginRequest={dispatchLoginRequest}
            />
          )}
        />
        <Route
          path='/register'
          render={props => (
            <Register
              {...props}
              loggedIn={Boolean(state.authToken)}
              registerUser={dispatchRegisterUser}
            />
          )}
        />
        <Route
          exact
          path='/chat'
          render={props => (
            <Chat {...props} loggedIn={Boolean(state.authToken)} />
          )}
        />

        <Route
          path='/logout'
          render={props => (
            <Logout
              {...props}
              loggedIn={Boolean(state.authToken)}
              logout={dispatchLogout}
            />
          )}
        />
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape().isRequired,
  dispatchLoginRequest: PropTypes.func.isRequired,
  dispatchRegisterUser: PropTypes.func.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });

export default withRouter(
  connect(
    mapStateToProps,
    {
      dispatchLoginRequest: loginRequest,
      dispatchRegisterUser: registerUser,
      dispatchFetchAllUsers: fetchAllUsers,
      dispatchLogout: logout,
      dispatchAddActiveChats: addActiveChats,
      dispatchAddQueuedChats: addQueuedChats,
      dispatchAddMessage: addMessage,
      dispatchAddQueuedChat: addQueuedChat,
      dispatchRemoveQueuedChat: removeQueuedChat,
    },
  )(App),
);

const x = {
  guest: {
    name: 'Sibyl',
    id: '5ccc5b1397d8d35160fc526c',
  },
  staff_member: {
    name: 'Jade',
    id: '5ccc5b1397d8d35160fc5260',
  },
  room: {
    name: '10',
    id: '5ccc5b1197d8d35160fc51c4',
  },
  _id: '5ccc5b1897d8d35160fc5b19',
  tickets: [
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b7b',
          text:
            'Hic labore sequi rerum deleniti consequatur sit et excepturi nobis quis dolorem saepe corporis quam facilis qui accusamus eum expedita architecto fugiat eaque ipsa iste deserunt incidunt laudantium omnis consequatur pariatur et dolor mollitia modi ipsum quis tempora.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b7a',
          text: 'Qui et commodi dolor velit non dolores numquam possimus esse.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b79',
          text:
            'Occaecati et sit eos quia non voluptas cum iure quisquam inventore maiores ipsa rerum ab ducimus rerum laboriosam quibusdam alias quidem omnis cumque sed omnis quod quis nulla odio voluptatum voluptatem iste voluptate maiores eveniet facere quia ea ab aperiam officia et qui reiciendis eius quis eum architecto harum aut tempora repellendus earum vero voluptatum vel similique quisquam molestias sed esse sint omnis a excepturi aut illum dicta enim laborum molestias itaque consequatur aliquid ut blanditiis qui est.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b78',
          text:
            'Sed blanditiis similique hic nostrum aut ut recusandae voluptatibus at perspiciatis est soluta facere omnis ut illum eius temporibus repellat quibusdam similique voluptate assumenda corporis nulla corrupti velit aperiam maiores.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b77',
          text:
            'Aut sint inventore sit qui voluptates ut est quibusdam quaerat id dicta consectetur nihil nam quidem iure numquam nulla voluptatem ex quo quia eos officiis vel vel sapiente dolor assumenda distinctio pariatur esse sunt aperiam animi nihil sit explicabo architecto eos praesentium perspiciatis et a qui nihil eligendi autem.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b76',
          text:
            'Quibusdam aut placeat earum laboriosam necessitatibus impedit repellendus recusandae culpa ipsum mollitia adipisci odio blanditiis maxime nam adipisci delectus pariatur ex distinctio nobis necessitatibus quibusdam a necessitatibus est qui quis rerum quis facilis iure asperiores nulla commodi nostrum nulla aperiam.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b75',
          text:
            'Repudiandae iusto consectetur et omnis earum et asperiores incidunt nisi distinctio quis.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b74',
          text:
            'Voluptatem minus quos assumenda nulla optio explicabo repudiandae autem laudantium autem corrupti iste maiores in quo eos aut magni est autem sint quia sequi totam iure quos at voluptas vel earum perferendis ex at qui autem tempore natus cum pariatur architecto vero eaque mollitia et.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b73',
          text:
            'Sed praesentium suscipit perferendis nulla rerum cumque aut non aut a expedita molestiae suscipit qui animi sequi recusandae nisi facilis veritatis illum corrupti ut repudiandae excepturi minima voluptatem provident ut culpa ex repellat odit cupiditate qui voluptas quisquam accusantium id ut omnis est modi occaecati et numquam et aut consequuntur adipisci distinctio cumque et aut quas et neque atque velit necessitatibus facilis tempore sint placeat sapiente error cupiditate eius et maiores est voluptatibus officia quis aliquid sunt corporis omnis qui ut dolorum porro consequuntur aliquid soluta mollitia aliquid est provident qui consequatur officiis sed quibusdam qui odit quisquam.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b72',
          text:
            'Ad aut eum magnam impedit voluptatibus perferendis est illo necessitatibus sint aspernatur hic.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b71',
          text:
            'Ut earum sint sit laborum voluptatem et rem libero autem enim cumque laudantium adipisci rerum autem dolor nesciunt autem quibusdam repudiandae quas corrupti nostrum ut omnis rem ipsam aliquid est ut nesciunt velit id recusandae odio cupiditate qui illo.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b70',
          text:
            'Sed natus accusantium similique occaecati dolores sit et fugiat sit aut sint atque qui tempora rerum libero nobis sed exercitationem beatae natus earum in magni ut alias dolore beatae aspernatur doloribus aut quaerat unde recusandae autem porro provident vel ut distinctio sequi magnam nostrum vel recusandae et voluptatibus officiis dolor ex velit ex mollitia est facilis laudantium aut laudantium ut animi ab voluptas.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b6f',
          text:
            'Et necessitatibus sed dolor quidem illo nihil quae sunt voluptatum consectetur aut cum eum non ea temporibus amet quidem enim cumque ut enim quam molestias ab cum est qui rerum delectus accusantium praesentium ratione.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b6e',
          text:
            'Facere amet fugiat id ut veniam aut quaerat maiores non eos et et praesentium labore ea necessitatibus est sunt et quia cupiditate veniam eum aut deserunt velit vitae qui nobis.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b6d',
          text:
            'Voluptate fugiat blanditiis autem quia molestiae est et eligendi corrupti hic excepturi necessitatibus rerum quis dolor et est est numquam excepturi dolore eos quos laudantium voluptatem doloribus ut iure tempora atque omnis ea odio dolorum illum omnis velit perferendis distinctio sit deleniti sunt et dicta eius in dolor aliquam doloremque ullam aliquid facilis consequatur commodi ut vitae id voluptas vitae in laboriosam harum mollitia temporibus sunt rerum rem autem iusto id deleniti quae rem provident numquam debitis distinctio harum enim ut est est qui.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b6c',
      status: 'closed',
      rating: 1,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b6b',
          text:
            'Eum accusamus voluptas error ipsum assumenda itaque dolorem repellendus qui molestiae minima quam voluptas quae aut molestiae tempore sapiente est maxime omnis consequatur ut a rem dignissimos debitis autem et earum omnis voluptas et nesciunt officia aut id sint ducimus qui est voluptatibus illum est ipsum magnam qui fugit facere nostrum ipsa quo consequatur ut magni sit reiciendis doloremque rem porro mollitia commodi dolor ut laboriosam nam laborum earum eum sed iste molestiae animi sed rerum magnam aut laboriosam maiores quo ad suscipit omnis nulla placeat.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b6a',
          text:
            'Perspiciatis ut aut assumenda odit vitae incidunt error dolores laboriosam velit expedita vero accusamus recusandae at aut at totam vel enim ut error fugit consequatur velit commodi vel.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b69',
          text:
            'Porro ut omnis suscipit molestias reiciendis eaque distinctio facilis voluptatem voluptas voluptatem illum sit quo cupiditate et voluptatem voluptas nesciunt repellendus delectus consequatur ex sed minima et illum alias eum quod soluta quis atque quisquam est voluptatem et et eum eaque quasi incidunt.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b68',
          text:
            'Ut saepe blanditiis delectus et aut impedit suscipit quia pariatur veniam quisquam quia voluptas autem eveniet sit quos occaecati harum omnis iusto nobis amet cum ut nobis et doloremque hic accusantium quo accusamus accusantium quo commodi ad et laborum facilis et aut ipsam eaque qui sed cumque tenetur sapiente velit doloribus omnis et voluptas quos sit et ipsa aut voluptatem repellat labore officiis nulla voluptas illo in numquam aut doloremque et placeat ad ea earum in aut sit consectetur voluptatem omnis possimus non unde et nobis provident voluptatem deserunt voluptas.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b67',
          text:
            'Corrupti temporibus voluptatem asperiores et repellendus maxime consequuntur cum perferendis et laboriosam qui sit quis molestiae doloremque officiis nisi voluptatem facilis ad voluptatibus ut sapiente aliquid qui illo consectetur sint in voluptatem dolorem nesciunt fuga excepturi quia nam vel est vel similique repudiandae voluptatem sit ut facere placeat voluptas sit et sunt quia sequi dolor quis deleniti labore sunt aut aspernatur facilis vero dignissimos vero qui voluptas est suscipit non atque.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b66',
          text:
            'Doloremque error sed eos quia hic repellat eaque asperiores maiores reiciendis id architecto et ea ducimus fugiat voluptate quisquam magni earum laboriosam aperiam suscipit voluptatem sit modi accusamus beatae reprehenderit non consequatur nobis eligendi nihil deserunt aut recusandae illum provident sint fugit ex quasi ut consequatur quaerat quae nihil qui provident iste id tempora nam ut et amet deleniti eligendi voluptatum excepturi impedit ad iste nobis nostrum impedit ut est quis earum minus et iure ut molestias dolores.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b65',
          text:
            'Incidunt quis rerum suscipit neque laboriosam temporibus vel et officia vel molestiae ex aliquid ratione minima deleniti similique eius repudiandae aliquid quod magnam animi tenetur deleniti cumque eveniet nemo est rerum eum maiores distinctio beatae eos quibusdam similique ab qui non quod voluptatem ipsam repellendus quia non quibusdam corporis et et voluptates animi consectetur quo reprehenderit in nulla mollitia asperiores fugiat soluta recusandae.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b64',
          text:
            'Consequuntur molestiae maxime autem impedit sunt ut autem laborum et impedit officia aut aut exercitationem dolorum et et repellendus quam laboriosam laborum quam molestias ullam dignissimos velit laboriosam non et deserunt unde voluptatum enim est et et consequatur non earum distinctio qui et accusamus dolor beatae laborum dolores sapiente consectetur eligendi corrupti.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b63',
          text:
            'Pariatur quod earum placeat ut in qui nemo accusamus reiciendis aut sunt et et inventore illo saepe repellendus quidem illum nihil quod modi fugit qui veniam ullam perspiciatis cum sed quasi distinctio saepe rerum dolore quis provident consequatur corrupti fugiat eveniet maxime culpa velit incidunt vel magnam magnam quam sunt magni est incidunt laborum hic ut iusto eaque voluptas sed et voluptas deleniti exercitationem optio eos et aut maxime ea sit iure sed temporibus repudiandae dignissimos magni dolorum debitis omnis deserunt dolorem sint aspernatur provident recusandae quidem amet laboriosam consequuntur.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b62',
          text:
            'Consequatur autem rerum tempore veniam culpa omnis illum voluptas rem ab accusamus libero officia et doloremque maiores dolores laudantium voluptas aliquam omnis rerum qui saepe exercitationem fugiat qui aliquid voluptatem vero dolor voluptatibus at aut omnis vitae consectetur sed ullam distinctio.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b61',
          text:
            'Eaque neque est nemo in modi nobis reiciendis aliquam nisi deleniti esse dolor doloremque dolor ratione velit veniam numquam natus minus aut sapiente molestias et omnis dignissimos ex ab aut omnis pariatur culpa ut enim blanditiis.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b60',
          text:
            'Ab sapiente debitis quis corporis enim ipsum sit molestiae ipsam temporibus qui sequi sunt aspernatur ipsa quaerat voluptatem voluptatem in sunt rerum natus voluptatum exercitationem architecto doloribus rem numquam perferendis et dignissimos facere saepe nemo corporis consequatur ratione harum ea tempore alias reiciendis voluptatem dolorem et laudantium expedita quo natus maxime similique quia beatae qui dolores eius.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b5f',
          text:
            'Voluptas vero praesentium commodi tenetur nisi ab facere enim et neque vel fuga quos quis amet quis alias quidem ad possimus quo alias sit omnis at tempora aut error ducimus ipsa non dicta fuga et eaque quidem dolor dolore quia inventore officia officia veritatis expedita ea vel rem suscipit officia minima.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b5e',
          text:
            'Sed commodi temporibus quia id eveniet repellendus minima nostrum commodi voluptatem placeat autem doloribus commodi magnam dolores est est ut excepturi dolorum quos.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b5d',
          text:
            'Saepe perferendis cum quam alias eos quaerat ullam omnis velit consequatur quos cupiditate omnis tempore qui qui quos quia iste perspiciatis reprehenderit.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b5c',
          text:
            'Ut repellendus qui praesentium provident molestias esse a aperiam aliquam et laboriosam error esse inventore dignissimos sit eligendi cum facilis maxime sint est quis est vel delectus quaerat soluta deserunt earum eius neque dolorem voluptas explicabo sint dignissimos voluptas fuga quia eligendi et dignissimos voluptatem tenetur a quo sunt qui officiis est vel quidem eos commodi adipisci non ut et delectus odio et sequi magni qui cumque doloribus eveniet sed.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b5b',
          text:
            'Et delectus iusto aspernatur non ut sint dolores sit odio qui iste ratione ex natus quis possimus corrupti in saepe cum ab.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b5a',
          text:
            'Voluptatem sint et quisquam sit aut consequuntur consectetur odio sit vero sunt qui laudantium nostrum est consequuntur eos minus molestiae delectus et eum vero nihil est tempora mollitia corporis nostrum unde officia sint tenetur sint est iusto id enim quos fugiat delectus distinctio molestiae asperiores accusamus reiciendis sed enim voluptatem officia qui autem eaque tenetur possimus dolore sunt ipsam dolor voluptas distinctio quia sunt autem perferendis aut dolore ducimus voluptatem omnis quas ut quia et illum est non fugiat aliquid.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b59',
      status: 'closed',
      rating: 1,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b58',
          text:
            'Esse placeat voluptas est ea accusantium ut dolores tempore fugit sed assumenda officiis qui ad harum dicta a repellat rerum est in consequuntur sit corrupti nesciunt quae minima mollitia veritatis ratione qui eaque non voluptatem deserunt non omnis blanditiis et cumque esse reprehenderit iusto quo fuga beatae provident consequatur aut quae sint et expedita molestiae voluptas nostrum consequuntur eum tempora consequatur et cum voluptatem culpa voluptas ut dolorum et quidem voluptatem necessitatibus.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b57',
          text:
            'Deleniti voluptas ipsam aut in reiciendis sint atque voluptatibus incidunt in minima dolorem placeat accusantium explicabo.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b56',
          text:
            'Consequatur doloremque autem nihil id consequatur molestiae facilis.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b55',
          text:
            'Nostrum odit qui impedit corporis natus sed et aliquam voluptas est ratione qui ratione omnis facilis sed at quia illo incidunt rerum et dolorem corrupti earum nam vel soluta adipisci sit nostrum cupiditate consequatur ut eligendi possimus ut neque.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b54',
          text:
            'Molestiae cupiditate voluptatem nulla sit rerum ipsa esse eum vero accusamus fugiat quia neque sit est et animi sint earum error est exercitationem aut aut dolorem maxime aut autem adipisci dolorem recusandae eum omnis fugit distinctio voluptatem aliquam nesciunt nesciunt nobis quaerat aut nostrum ipsum ut perspiciatis voluptas occaecati sed minima commodi delectus molestiae nam cumque perspiciatis beatae odio ullam saepe incidunt quae possimus inventore et dolorem earum natus et quam eligendi provident totam possimus aperiam vel consequatur illo maiores.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b53',
          text:
            'Dolore laudantium et vel accusamus neque autem tempore id nobis et aspernatur quia magni rerum et non ipsum quibusdam.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b52',
          text:
            'Harum deleniti rerum temporibus accusantium veniam laboriosam voluptatem reprehenderit quas nostrum ex sapiente incidunt et ipsa quo ut hic voluptate officiis et provident iusto aspernatur nihil sit perferendis autem adipisci nemo sit aut explicabo hic suscipit nulla tenetur molestiae sed in doloribus aliquam voluptatem aut exercitationem eaque fugit quo iure nesciunt consequuntur voluptates tempore quisquam dolore.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b51',
          text:
            'Omnis excepturi et fuga illo iste deleniti voluptas ullam esse cupiditate in esse id ipsum non ut id impedit.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b50',
          text:
            'Doloremque rerum eaque error non in qui minus quidem saepe laborum voluptate rerum in sint quam voluptatem aut tempora est beatae consequatur nulla itaque omnis iusto nihil consequatur non quam optio perferendis qui tempore dolorem et fugit aliquam consequuntur nostrum aut aut dignissimos a aperiam sunt et reprehenderit eos et aut sit est sunt quia impedit nisi labore omnis rem delectus libero aperiam nesciunt eaque totam laboriosam molestias vitae sed explicabo qui sint libero sed ratione animi quis alias temporibus sit alias ex ut inventore aut odio cum et praesentium qui quibusdam quod nostrum dolores optio nostrum accusantium est.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b4f',
          text:
            'Reiciendis recusandae quisquam repudiandae ut exercitationem a possimus amet eveniet et facilis et atque magni laboriosam nam ea id.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b4e',
          text:
            'Atque veniam fugiat aliquam totam eos sint nesciunt nihil veniam soluta ex necessitatibus aut velit sunt totam earum in sed illo velit sed iure maiores sed nulla non quae sequi consequatur repellendus aperiam ipsum sunt dolore.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b4d',
          text:
            'Dolorem adipisci sed voluptas et quis suscipit exercitationem veniam eaque commodi omnis esse eum tenetur est magnam eum fugiat nesciunt vero quo voluptatem quas nam et veniam suscipit autem sunt provident quas exercitationem error qui atque ut voluptas iure neque nulla enim.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b4c',
          text:
            'Sunt illum magnam doloremque quia voluptates molestiae voluptatem quidem sit in omnis a quod dolores sit sunt ut ullam eum ullam modi et quis alias rerum et harum voluptatem aperiam sint impedit ut labore fugiat id modi dicta autem dolorum quasi voluptas labore repellat veritatis consectetur ut voluptates vitae quia est eos ea quia et sint quidem sapiente ut amet est error et cum dolorum dolores non facere nemo vel ipsum totam fugit ad.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b4b',
          text:
            'Est est aut rerum est harum animi ut vel et sed nihil ipsa quo impedit rerum qui consequatur autem recusandae id ipsam quaerat vitae ipsam at est nisi.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b4a',
          text:
            'Quia rerum in sit reprehenderit atque et odit repudiandae aut dolorum eum in nihil occaecati ab repellendus commodi asperiores veritatis ipsa adipisci corrupti est sunt unde earum praesentium ipsam dolore quis libero dignissimos sint totam quasi ullam quo molestiae iusto occaecati quisquam animi veniam itaque perferendis quibusdam quo accusamus ut qui alias.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b49',
          text:
            'Voluptatem ad et iste ut pariatur et repellendus maxime optio error alias qui unde voluptatem enim dolor dolor voluptas quidem voluptatem ut nam harum aut expedita ratione architecto distinctio adipisci possimus asperiores velit ipsa doloribus et ut est dolores temporibus numquam facilis doloremque rerum aut ad ipsa expedita voluptas fugiat et delectus ut incidunt eaque officia dolores et incidunt officia qui omnis labore enim quasi quae temporibus nobis architecto ducimus rerum voluptatibus dolorem quia placeat porro eaque officia voluptas at necessitatibus in sunt vel maiores ratione dolores doloribus voluptatem libero aliquid nisi reiciendis repudiandae quibusdam.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b48',
          text:
            'Voluptate cum necessitatibus rerum ducimus magni ipsa quisquam blanditiis.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b47',
          text:
            'Vel quia fugiat itaque laudantium et nemo modi nisi sit nobis aperiam et dignissimos beatae debitis totam vero non.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b46',
          text:
            'Harum et qui rem optio ut aut error deserunt suscipit recusandae molestiae aut incidunt qui inventore molestiae totam animi et ut iste est amet est voluptatem animi natus aut rerum repellendus sit aspernatur saepe tempore nobis ex earum id nesciunt et veritatis ea sit dignissimos vel tempore non provident occaecati rem beatae aliquid labore autem eius provident sit animi reprehenderit odio dolores consequuntur placeat placeat libero maxime maiores.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b45',
      status: 'closed',
      rating: 4,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b44',
          text:
            'Aut ut odit est tenetur facere doloribus sit nemo et aut eaque.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b43',
          text:
            'Est totam est non velit et facere commodi ad est et et amet enim sunt magni ullam modi accusamus et laudantium ut similique possimus quos et sit voluptates est explicabo incidunt sed sit omnis et officiis ea dolor et assumenda consectetur blanditiis rerum rem aut ipsum repellat incidunt nihil id vitae perferendis quasi voluptas.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b42',
          text:
            'Ipsam sunt iste cum cumque qui sed voluptates repellat dignissimos temporibus odio et corrupti praesentium iste et odit assumenda dignissimos molestiae maxime odio atque et deleniti velit explicabo ut eaque quasi ex sed nisi non laboriosam qui iste necessitatibus deleniti voluptas omnis voluptatem adipisci dolores quos voluptatibus dolorem possimus sed beatae ipsum voluptatem ut et rerum recusandae a quidem voluptatem quia non quia sunt fugiat omnis dolores.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b41',
          text:
            'Veritatis esse magni nostrum sed earum et reiciendis eum tenetur facilis voluptatem ab autem quisquam tempora atque mollitia labore labore et est totam molestias culpa velit illum itaque voluptas eligendi maxime ut aperiam non voluptates dolor placeat explicabo corporis.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b40',
          text:
            'Voluptates nam nulla nihil dignissimos voluptas incidunt sunt et rerum tenetur repellat tempore dolor consequatur maiores perspiciatis voluptates doloremque eos laborum aut et dolores recusandae consectetur aliquid molestiae voluptatum et quo hic possimus consequatur quis enim repellat porro dolore quos sit eum veniam quo quae et distinctio quia porro est saepe et nihil expedita dolor ad ut quasi suscipit a ratione quia eum eum autem.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b3f',
          text:
            'Voluptate fugit repudiandae aperiam quibusdam ipsum dolorum expedita sed voluptatum.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b3e',
          text:
            'Voluptatem totam ut et assumenda ut temporibus suscipit labore deserunt et perspiciatis dicta saepe laudantium perspiciatis numquam omnis fugit et ratione harum eveniet mollitia quaerat ut facere facere velit odio et sapiente qui perferendis perspiciatis fuga quia suscipit ipsum odit nostrum accusantium sint iure doloremque placeat mollitia qui qui autem hic dolorem et maiores eos blanditiis voluptatum voluptas exercitationem quia maxime alias ea atque voluptas cum accusamus.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b3d',
          text:
            'Reprehenderit ipsam sit voluptates adipisci et culpa sint reprehenderit recusandae inventore error ipsum in et veniam possimus distinctio veniam iste in impedit pariatur iste omnis aut illum eius iusto enim natus exercitationem vel esse et tempora corrupti vel et repudiandae iure sit veritatis aut minima consectetur ducimus aut quidem quia error perferendis accusamus hic sint maxime aut molestiae non et eos tempora a non est error explicabo qui dicta quo et consequatur sit quaerat beatae blanditiis adipisci vero voluptas numquam.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b3c',
          text:
            'Perspiciatis omnis rerum nisi et occaecati autem minima voluptas itaque aperiam ducimus nostrum fugiat labore ex voluptate consequatur eos non quasi ex dolore accusamus et nostrum maxime minus consequatur in nobis ipsam quaerat voluptate et est consequuntur minus nulla incidunt sed porro maxime vel porro aut dolor quo ea laboriosam et expedita fuga vitae neque sit asperiores dolores unde voluptatem cum aut suscipit maiores voluptatem tempora temporibus error sit veniam.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b3b',
          text:
            'Facilis dolorum ab sed minus a neque quis dolor quam dicta ea consequatur optio possimus sit ut alias a sint illum ut tempore distinctio quaerat modi minima delectus deleniti quibusdam accusamus amet in et est deserunt recusandae nulla quisquam ab facilis ut soluta aperiam reprehenderit commodi non deserunt sit exercitationem deleniti enim quis blanditiis quo fugit dolor consequatur qui sunt est est autem inventore aut rerum repellat et sunt nostrum autem velit maxime ut atque reprehenderit est est qui fugiat quia voluptatem debitis perferendis dolor quisquam doloremque et ea ut deserunt sequi aut illo voluptas sapiente et ducimus.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b3a',
      status: 'closed',
      rating: 4,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b39',
          text:
            'Laboriosam eligendi est qui maiores molestiae debitis quam sapiente assumenda repellendus doloremque expedita id atque iure non cupiditate et animi vitae eius excepturi reiciendis quaerat laudantium minus id sed sit aut sed temporibus itaque sit.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b38',
      status: 'closed',
      rating: 1,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b37',
          text:
            'Sapiente optio sed eius fugiat atque id odio doloribus iure totam autem repellendus deleniti impedit quis inventore quam sint voluptatem et eius qui iste voluptas qui et eveniet dignissimos ut soluta omnis praesentium autem ut qui veniam sapiente asperiores modi saepe a dolorum ut quia sit amet cumque eius soluta voluptatum sequi vero in enim harum perferendis eos aut voluptates pariatur optio eum officia voluptatibus odio perferendis et repudiandae.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b36',
          text:
            'Aperiam dolores sed consequatur at delectus officia nobis praesentium provident aspernatur vero est at fuga hic adipisci et sed quis dolorum quae dolor expedita minima rerum vel voluptatem id sit doloremque a dignissimos et dolorem sit voluptatem numquam sit odio et illo molestias omnis reiciendis omnis minus iure aut blanditiis ut assumenda id quis non dignissimos veniam corporis quis hic minima soluta dicta ipsum rem autem est ad aperiam dolorem vitae eos sit rerum eos eaque pariatur fugiat minima numquam aut inventore iusto qui dolorem eligendi asperiores sint eligendi aut ipsum.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b35',
          text:
            'Rerum est accusamus beatae voluptas hic sequi et veniam et ab dolorum et qui soluta fuga repellat accusantium aliquid.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b34',
          text:
            'Odit modi non rerum occaecati facilis hic adipisci consectetur quod aut nemo minima dolor repellendus dolor et expedita et.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b33',
      status: 'closed',
      rating: 3,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b32',
          text:
            'Exercitationem consequatur illum nemo ea exercitationem libero natus voluptatibus consectetur amet esse eius ut eos iste omnis dolore a nostrum sapiente et quibusdam et tempora ut repellat exercitationem quia delectus omnis eos ut repellat odit velit cumque sit minus accusamus ea dicta qui consequatur vero officia mollitia autem mollitia magni neque aspernatur similique voluptates molestiae est quasi excepturi dignissimos ut aut illum odio vel veniam minus autem maiores necessitatibus adipisci corporis quo officia sit quo pariatur qui itaque quasi distinctio praesentium itaque cum vitae ut voluptatibus sed soluta ea similique et placeat asperiores.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b31',
          text:
            'Vel impedit eveniet asperiores et veniam quisquam eos quo neque delectus enim omnis accusantium sint quod dolorum vel impedit dignissimos velit rem iure tenetur pariatur facere autem quia consequuntur vero voluptatum quia eius in quos ut sint ut fugit voluptatem voluptas qui repellendus sed aspernatur.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b30',
          text:
            'Iure aut itaque enim magni debitis et exercitationem quisquam qui beatae.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b2f',
          text:
            'Animi consequatur maiores et ut sequi iure voluptatum deleniti fugiat voluptatibus odio excepturi dolore delectus mollitia enim eaque quod voluptatem itaque quaerat praesentium omnis itaque labore qui ratione sit exercitationem numquam est qui quibusdam voluptatem voluptatem itaque et soluta consequuntur asperiores voluptas.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b2e',
          text:
            'Fugit in ab deserunt facilis voluptas corrupti eligendi non aliquam et et explicabo eos itaque qui nesciunt vel sed quis libero consequuntur labore id iusto aut consequatur qui tenetur nam veritatis repudiandae voluptas vel corrupti impedit odit dolor eius odio tempore veritatis sunt qui asperiores ut ipsum id qui magnam illum rerum numquam esse qui beatae.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b2d',
          text:
            'Dolores in necessitatibus perferendis et fugiat deserunt facilis velit illo quod temporibus non provident sed debitis omnis et molestiae soluta debitis qui doloremque omnis reiciendis sed fugit optio non laboriosam et qui eum quis debitis ab perspiciatis sint totam saepe deserunt quidem a.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b2c',
          text:
            'Totam maxime enim non ut nihil est aut cupiditate qui consequatur quia est esse pariatur sed doloribus commodi quo nostrum ut nemo molestias dolores occaecati distinctio et nihil tempore sapiente iure modi officiis voluptas adipisci et perspiciatis modi eaque odio dolorum accusantium officia ea qui cum nam quia reprehenderit eaque.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b2b',
          text:
            'Voluptas quo similique tempore et asperiores omnis distinctio ut non tempora quidem debitis et magni architecto tempore.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b2a',
          text:
            'Tempora voluptatem exercitationem tempore maxime incidunt omnis labore et nemo adipisci voluptatem est sed tempora est mollitia architecto rerum architecto rerum perspiciatis dolores hic cupiditate aliquam ut ad sed sit animi qui accusantium illo voluptatem eveniet laborum fugiat aut eum distinctio totam tempore quisquam aut cumque possimus natus dolor porro ipsa pariatur rerum repudiandae reiciendis repellat exercitationem voluptatem nulla eum quos ex saepe sapiente possimus aut commodi omnis non amet delectus libero deleniti.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b29',
          text:
            'Dolorum veniam sed nostrum optio et modi eius et quae et odio dolore veritatis dolorem in voluptatibus in praesentium distinctio et ducimus repudiandae optio maxime occaecati repudiandae ut soluta.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b28',
          text:
            'Totam odit quia nemo non quidem repellendus ea aut nulla vitae.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b27',
          text:
            'Possimus tempora libero suscipit vel eos in animi consequatur cupiditate magni alias et laborum est consequatur architecto aut rerum dolor eos sed pariatur facilis praesentium commodi blanditiis quibusdam fugiat animi perspiciatis est aut perferendis dignissimos est temporibus quibusdam.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b26',
          text:
            'Sed ad reprehenderit mollitia sed sequi sapiente sed omnis voluptas voluptatem similique non quam molestias occaecati eos et quisquam consequuntur tempora assumenda illo est optio sunt labore eos nam quisquam nulla et iste molestias quaerat ullam quia eveniet et molestias culpa excepturi aut nulla suscipit error dolore veritatis eum sunt soluta blanditiis a sit sed provident consequatur quo voluptas natus ab quam nulla cumque veniam omnis ut illo impedit ut eveniet porro earum qui corrupti et qui nam consequuntur pariatur.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b25',
      status: 'closed',
      rating: 3,
    },
    {
      messages: [
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b24',
          text:
            'Ut amet delectus et magnam et culpa rem molestiae nobis modi est animi voluptas voluptatum et quibusdam eius ipsam quos nulla ut aut autem fugit nam earum esse voluptate animi possimus aperiam placeat aut rerum aut neque dolor ipsa alias nostrum soluta nostrum quo dolor fugit corporis et sequi et id quo omnis doloribus voluptatum accusamus voluptas delectus perferendis ipsam ut iste cum aut accusamus officiis maxime quia eum facilis nostrum at consequatur saepe voluptas deleniti.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b23',
          text:
            'Nam in praesentium tempora eum deleniti doloremque at ut aut voluptates dolorem voluptas provident iste quo nihil sed numquam aut iste illo est earum dolore fugiat quibusdam explicabo qui dolorem quaerat quo vitae est quae cum aut sequi quaerat.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b22',
          text:
            'Commodi nisi amet cumque architecto animi vero quae id ducimus id aut ullam et corporis expedita tempore ipsam quo excepturi nemo expedita omnis quam nulla.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b21',
          text:
            'Ipsa sunt animi hic cum expedita quidem repellendus veritatis sapiente iusto id iure quam ut sit voluptas architecto excepturi aut ut esse fuga sed consequatur rerum minima voluptatum amet eius.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b20',
          text:
            'Aliquid impedit itaque esse quo necessitatibus natus aut incidunt magnam ea nesciunt sit quo blanditiis sunt et libero accusantium sed neque autem iure iure illo voluptas aspernatur explicabo quasi a ut eveniet porro laborum alias facere dolore corporis autem praesentium autem autem consequatur non quos eius deserunt sed sed dolores eius magni molestias aperiam.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b1f',
          text:
            'Dolores fugit in nobis ut quo quisquam ut eos aliquam non tempora voluptate laudantium reprehenderit voluptatem sint tempora aliquam qui est non sint qui nihil corporis molestiae et mollitia ut esse repudiandae doloremque ut et facere perferendis ex laboriosam porro velit dolor.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b1e',
          text:
            'Numquam quisquam ducimus ab veniam quia quidem rerum impedit molestias et.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b1d',
          text:
            'Blanditiis molestias rerum qui sequi laborum aut neque possimus dolorum dolores id ut et consectetur suscipit sed earum inventore harum rem quasi quas autem sunt illum velit aliquam soluta ducimus quas dolorum officia reprehenderit minima debitis velit dolore quo aliquid sed aliquam consectetur officia sapiente inventore totam eum in optio sit est voluptates quo consequatur quia facilis optio voluptatem sunt nihil.',
        },
        {
          sender: {
            name: 'Sibyl',
            id: '5ccc5b1397d8d35160fc526c',
          },
          _id: '5ccc5b1897d8d35160fc5b1c',
          text:
            'Quisquam non et labore et aut et et sed perspiciatis earum nisi.',
        },
        {
          sender: {
            name: 'Jade',
            id: '5ccc5b1397d8d35160fc5260',
          },
          _id: '5ccc5b1897d8d35160fc5b1b',
          text:
            'Id ut optio laboriosam voluptas vel facere autem non qui repellendus natus quam et ducimus quia totam sed repudiandae et mollitia impedit doloribus qui sit iusto earum et quidem necessitatibus enim ad ut fugiat suscipit fugiat commodi quo ea et sed similique ut aut ipsam sint impedit reiciendis voluptas et natus perspiciatis ut dolorum consequatur quo et mollitia ut expedita enim et inventore amet officiis aspernatur commodi cum ullam dolorum ut cum autem.',
        },
      ],
      _id: '5ccc5b1897d8d35160fc5b1a',
      status: 'queued',
      rating: null,
    },
  ],
  hotel_id: '5ccc5b1197d8d35160fc51ba',
  __v: 0,
};
