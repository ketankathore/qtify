import './Section.css';

const Section = ({ title, children, headerAction }) => {
  return (
    <section className="pageSection">
      <div className="sectionHeader">
        <h2>{title}</h2>
        {headerAction ? <div className="sectionHeaderAction">{headerAction}</div> : null}
      </div>
      <div className="sectionContent">{children}</div>
    </section>
  );
};

export default Section;
