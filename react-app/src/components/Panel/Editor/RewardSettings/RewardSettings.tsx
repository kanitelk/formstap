import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './RewardSettings.scss'
import { EditorStoreContext } from '../../../../stores/editorStore';

const RewardSettings: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  return <div className="reward-settings">
    reward settings
  </div>
})

export default RewardSettings;