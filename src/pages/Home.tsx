import React from 'react';
import { ReactComponent as ScrumBoardPlaceholder } from '../images/undraw_Scrum_board_re_wk7v.svg';
import { ReactComponent as StabilityBall } from '../images/undraw_Stability_ball_b4ia.svg';
import { Link } from 'react-router-dom';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="Home" data-testid="home-test">
      <Link to="/">
        <section>
          <h2>Habits</h2>
          <picture>
            <StabilityBall />
          </picture>
        </section>
      </Link>
      <Link to="/boards">
        <section>
          <h2>Boards</h2>
          <picture>
            <ScrumBoardPlaceholder />
          </picture>
        </section>
      </Link>
    </div>
  );
};
