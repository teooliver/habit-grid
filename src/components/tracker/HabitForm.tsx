import React, { FC, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createHabit, Habit } from '../../redux/actions/habits';
import { StoreState } from '../../redux/reducers';
import PlusCircleIcon from '../layout/icons/PlusCircleIcon';
import ArrowDownIcon from '../layout/icons/ArrowDownIcon';

interface Props {
  createHabit: Function;
  habits: Habit[];
}
const HabitForm: FC<Props> = ({ createHabit, habits }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [isValid, setIsValid] = useState(true);
  const habitFormRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e));
    };
  }, []);

  useLayoutEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleClickOutside: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      habitFormRef.current != null &&
      !habitFormRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    } else {
      return;
    }
  };

  const inputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      return setIsValid(false);
    }
    return setIsValid(true);
  };

  // TODO: Implement working validation for empty strings
  const handleSubmit = () => {
    if (isValid) {
      createHabit(habitName);
      setHabitName('');
      setIsOpen(false);
    }
  };

  return (
    <div ref={habitFormRef} className="HabitForm" data-testid="habit-form">
      {habits.length === 0 && (
        <div className="arrow-animation-container">
          <ArrowDownIcon className="arrow-down" />
        </div>
      )}
      <div
        data-testid="open-habit-form"
        onClick={() => {
          setIsOpen(!isOpen);
          setHabitName('');
        }}
      >
        <PlusCircleIcon className="plus-circle" />
      </div>
      {isOpen && (
        <form>
          <input
            ref={inputRef}
            type="text"
            id="name"
            required
            value={habitName}
            onChange={(e) => {
              inputValidation(e);
              setHabitName(e.target.value);
            }}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label htmlFor="name">New Habit</label>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = ({ habits }: StoreState) => {
  return {
    habits,
  };
};

export default connect(mapStateToProps, { createHabit })(HabitForm);
