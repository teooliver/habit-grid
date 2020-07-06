import React, { useState } from "react";
import ArrowBarRightIcon from "./icons/ArrowBarRightIcon";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerticalSlideMenu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  // put icon to close the menu
  // clickoutside to close

  //
  return (
    <section className={`VerticalSlideMenu ${isOpen ? "open" : ""}`}>
      <div className="" onClick={() => setIsOpen(false)}>
        <ArrowBarRightIcon className="close-icon" />
      </div>

      <article className="faq">
        <h2>FAQ: </h2>
        <p className="faq__question">- Where's is my data stored?</p>
        <p className="faq__answer">
          Habit Grid doesn't upload your data to any server, yours data is
          stored on your device. Because of that, you can't sync your data with
          other devices or between browsers on the same device.
        </p>
        <p className="faq__question">- How do a delete a habit row?</p>
        <p className="faq__answer">
          Click on the habit name (first cell of the row), a trash icon will
          appear, click on the trash icon to delete. Be careful, there's is no
          undo for that.
        </p>
        <p className="faq__question">- How do I add a habit to the table?</p>
        <p className="faq__answer">
          On the bottom right corner of the screen you will find a big "plus"
          button, to click on that, fill the input field and press enter. (or
          click on submit).
        </p>
        <p className="faq__question">- What about privacy?</p>
        <p className="faq__answer">
          All your data is stored in a database in the browser. Check your
          browser's privacy rules to be sure that they are not getting your
          data. But you can be sure that HabitGrid is not. (We recommend using
          Firefox)
        </p>
        <p className="faq__answer">
          Habit grid doesn't run any kind of scripts to collect data. You can
          trust this because the app is open sourced and can be audited.
          <a
            className="faq__answer"
            href="https://github.com/teo-oliver/habit-grid"
          >
            Click here to check it out.
          </a>
        </p>
      </article>
      <div className="delete-data-button">
        <button>Delete All Data</button>
      </div>
    </section>
  );
};

export default VerticalSlideMenu;
