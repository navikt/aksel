import React from "react";
import Formgroup from "../src/index";

export default {
  title: "@nav-frontend/react-formgroup",
  component: Formgroup,
};

export const All = () => {
  return (
    <>
      <h1>Default</h1>
      <Formgroup>
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </Formgroup>

      <h1>Title</h1>
      <Formgroup title="Dette er en tittel">
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </Formgroup>

      <h1>Title + description</h1>
      <Formgroup
        title="Dette er en tittel"
        description="Dette er en description"
      >
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </Formgroup>

      <h1>With errorstring</h1>
      <Formgroup
        title="Dette er en tittel"
        description="Dette er en description"
        error="Dette er en feilmelding"
      >
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </Formgroup>
      <h1>With errorElement</h1>
      <Formgroup
        title="Dette er en tittel"
        description="Dette er en description"
        error={
          <div>
            <h3>Dette er en custom feilmelding</h3>
          </div>
        }
      >
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </Formgroup>
    </>
  );
};
