import React, { useState } from "react"
import "./styles.scss"

enum State {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const Contact: React.FunctionComponent = () => {
  const [status, setStatus] = useState<State | undefined>(undefined)

  const submitForm = (ev: any) => {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        setStatus(State.SUCCESS)
      } else {
        setStatus(State.ERROR)
      }
    }
    xhr.send(data)
  }

  const returnAction = (status: State) => {
    if (status === "SUCCESS") {
      return (
        <p className="contact__submit-result">
          Thanks for contacting me. I will come back to you soon!
        </p>
      )
    }
    if (status === "ERROR") {
      return (
        <p className="contact__submit-result">Ooops! There was an error.</p>
      )
    }
    return (
      <button className="contact__submit" type="submit">
        Submit
      </button>
    )
  }

  return (
    <form
      className="contact__form"
      onSubmit={submitForm}
      action={`${process.env.GATSBY_FORM_ENDPOINT}`}
      method="POST"
    >
      <label className="contact__label">Name:</label>
      <input className="contact__input" type="name" name="name" />
      <label className="contact__label">Email:</label>
      <input className="contact__input" type="email" name="email" />
      <label className="contact__label">Message:</label>
      <textarea className="contact__text" name="message" />
      {returnAction(status)}
    </form>
  )
}

export default Contact
