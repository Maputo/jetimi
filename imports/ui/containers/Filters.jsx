import React from 'react';
import FilterIdContainer from './FilterIdContainer.jsx';
import FilterValueContainer from './FilterValueContainer.jsx';
import Filter from '/constants/FilterConstants.js';

const NOOP = () => {
};
const FILTERS = Object.values(Filter);

const getFilterForId = (id) => FILTERS.find((f) => f.ID === id);

const Filters = () => {
  const [filter, setFilter] = React.useState({});

  const onFilterSelectCallback = (filterId) => setFilter(getFilterForId(filterId));

  return (
    <div className="Filters">
      <FilterIdContainer filters={FILTERS} onSelect={onFilterSelectCallback} />
      <FilterValueContainer filter={filter} onSelect={NOOP} />
    </div>
  );
};

export default Filters;
