import './home.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-body">
          <p className="title">Be consistent with your candidate screening process</p>
        </div>
      </div>
      <div className="container is-fullhd">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child notification is-primary">
              <p className="title">Capture</p>
              <p className="content">Have a good question? Capture it here with key guidance for the interviewer when asking it.</p>
            </article>
            <article className="tile is-child notification is-primary">
              <p className="title">Configure</p>
              <p className="content">Categorize and tag your question. Configure interview script templates.</p>
            </article>
            <article className="tile is-child notification is-primary">
              <p className="title">Create</p>
              <p className="content">Create interview scripts based on your templates.</p>
            </article>
            <article className="tile is-child notification is-primary">
              <p className="title">Curate</p>
              <p className="content">Refine your questions and script templates based on your interview experience.</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
