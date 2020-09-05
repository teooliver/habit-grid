import React from 'react';
import ArrowBarRightIcon from './icons/ArrowBarRightIcon';
import Logo from './Logo';

import { connect } from 'react-redux';
import { deleteAllHabits } from '../../redux/actions';
import { NavLink, useLocation } from 'react-router-dom';
import { NavBarCreateBtn } from './NavBarCreateBtn';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAllHabits: Function;
}

const VerticalSlideMenu: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  deleteAllHabits,
}) => {
  const confirmDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all your Habits?')) {
      deleteAllHabits();
      console.log('The database was deleted');
    }
  };

  return (
    <section className={`VerticalSlideMenu ${isOpen ? 'open' : ''}`}>
      <div className="" onClick={() => setIsOpen(false)}>
        <ArrowBarRightIcon className="close-icon" />
      </div>
      <div className="logo">
        <Logo className="vertical-menu-logo" backgroundColor="transparent" />
      </div>
      <ul className="navigation">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Habits
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/kanban" activeClassName="active">
            Boards
          </NavLink>
        </li>
      </ul>
      <section className="create-board-section">
        <NavBarCreateBtn />
      </section>

      <article className="faq">
        <h2>FAQ: </h2>
        <p className="faq__question">- How do I add a habit to the table?</p>
        <p className="faq__answer">
          On the bottom right corner of the screen you will find a big "plus"
          button, to click on that, fill the input field and press enter. (or
          click on submit).
        </p>
        <p className="faq__question">- How do I delete a habit row?</p>
        <p className="faq__answer">
          Click on the habit name (first cell of the row), a trash icon will
          appear, click on the trash icon to delete. Be careful, there's is no
          undo for that.
        </p>
        <p className="faq__question">- Where is my data stored?</p>
        <p className="faq__answer">
          Habit Grid doesn't upload your data to any server, your data is stored
          on your browser.
        </p>
        <p className="faq__question">- What about privacy?</p>
        <p className="faq__answer">
          All your data is stored in a database in the browser. Check your
          browser's privacy rules to be sure that they are not getting your
          data. But you can be sure that HabitGrid is not.
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

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <button
          onClick={() => {
            confirmDeleteAllData();
          }}
        >
          Delete All Data
        </button>
      </div>
    </section>
  );
};

export default connect(null, { deleteAllHabits })(VerticalSlideMenu);
