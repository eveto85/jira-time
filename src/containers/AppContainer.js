import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider, connect } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    routes  : PropTypes.object.isRequired,
    store   : PropTypes.object.isRequired
  }

  componentWillMount () {
    if (!window.__mainDropBinded) {

      window.__mainDropBinded = true;

      ['drag',
        'dragend',
        'dragenter',
        'dragexit',
        'dragleave',
        'dragover',
        'dragstart',
        'drop'].forEach(name => document.addEventListener(name, e => e.preventDefault(), false));

      document.addEventListener('drop', function (event) {
        const url = event.dataTransfer.getData('URL');

        window.__events.emit('drop', { url });
      }, false);
    }
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100vm', width: '100vw' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

function mapStateToProps (state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
