import React from "react";
import "../styles/contact.scss";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Back from "../components/common/Back";

const Contact = () => {
  return (
    <>
      <section className="contact mb">
        <Header />
        <Back
          name="Contact Us"
          title="Our team awaits to support you 24 hours."
          cover="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
        />
        <div className="containerr">
        <form className='shadow'>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' placeholder='Name' />
              <input type='text' placeholder='Email' />
            </div>
            <input type='text' placeholder='Subject' />
            <textarea cols='30' rows='10'></textarea>
            <button>Submit Request</button>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Contact;
