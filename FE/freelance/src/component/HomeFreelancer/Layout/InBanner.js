import React from "react";

function HeadingComponent({ tag: Tag, id, className, title }) {
  return (
    <div>
      <Tag id={id} className={className}>
        {title}
      </Tag>
    </div>
  );
}

function Button({ type, id, className, title }) {
  return (
    <button type={type} id={id} className={className}>
      {title}
    </button>
  );
}

function InBanner({ titleTop, titleBot, buttonTitle }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-8">
          <HeadingComponent
            tag="h5"
            id="title-top"
            className="title-top"
            title={titleTop}
          />
          <HeadingComponent
            tag="h4"
            id="title-bot"
            className="title-bot"
            title={titleBot}
          />
          <Button
            type="submit"
            id="btn-now"
            className="btn btn-dark text-light border border-dark"
            title={buttonTitle}
          />
        </div>
        <div className="col-12 col-md-4 d-flex align-content-center">
          <div className="boxes">
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InBanner;
