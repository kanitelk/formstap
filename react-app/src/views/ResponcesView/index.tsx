import './ResponcesView.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ResponcesStoreContext } from '../../stores/responcesStore';
import ResponcesTable from '../../components/Panel/Responces/ResponcesTable';

const ResponcesView: React.FC = observer(() => {
  const store = useContext(ResponcesStoreContext);
  const { id } = useParams();
  useEffect(() => {
    store.getAnswers(id!);
    return () => {
      store.clear()
    }
  }, []);
  return (
    <div className="responces-view">
      <h1>{store.form?.title}</h1>
      {store.isLoading || !store.responces ?  <p>Loading...</p> : <ResponcesTable />}
    </div>
  );
});

export default ResponcesView;