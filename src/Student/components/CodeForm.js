import React , {useState} from 'react'

export default function CodeForm(props) {

  const [formData, setFormData] = useState({ code: '', password: '' })

  const handleChange = (target) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit(formData)
  }

  return (
    <div className="register-adventure">
      <h3 className="student-landing">If you have an Adventure Code, enter it here.</h3>
      <form className="below extra-below" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="adventureId">Enter Adventure Code</label>
        <input
          className="adventure-input"
          type="text"
          name="code"
          placeholder="5c9ceaeac543f706bf407cae"
          value={formData.code}
          onChange={(e) => handleChange(e.target)}
        ></input>
        <label htmlFor="adventurePass"> Include password (if applicable)</label>
        <input
          className="adventure-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e.target)}
        ></input>
        <button className="s" type="submit">
          Start Adventure
        </button>
      </form>
    </div>

  )
}
