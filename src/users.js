import React from 'react'
class Contact extends React.Component {
  onSubmit = () => {
    this.props.history.push('/negara')
  }
  render() {
    return (
      <form>
        <input placeholder="name" type="name" />
        <input placeholder="email" type="email" />
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    )
  }
}
export default Contact