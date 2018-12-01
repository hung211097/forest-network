import React, { Component } from 'react';
import { UserCard } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
  return{
    users: state.usersReducer.users
  }
}

class ListUser extends Component {
  static propTypes = {
    users: PropTypes.array
  }

  render() {
    let {users} = this.props
    return (
      <div className="row animated fadeIn">
        {!!users.length && users.map((item, key) => {
            return(
              <div className="col-sm-6 col-12">
                <UserCard user={item}/>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListUser);
