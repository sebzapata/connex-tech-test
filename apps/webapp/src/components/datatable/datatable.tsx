import { useInteractionStats } from '../../lib/api';

const Datatable = () => {
  const { data } = useInteractionStats();

  const interactionStats = data?.data.data;

  if (!interactionStats) return null;

  return <div>Datatable</div>;
};

export default Datatable;
