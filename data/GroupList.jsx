import { View, Text, Modal } from 'react-native'
import React, {  useState } from "react";
import CorrectionModalComponent from '../component/CorrectionModalComponent'

const GroupList = () => {

  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModal = (isVisible) => {
    setModalVisible(isVisible);
  };


  return (
    <View>
      <Text
        onLongPress={() => toggleModal(true)}

      >GroupList</Text>

      


      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => toggleModal(true)}
      >
        <CorrectionModalComponent number={''} toggleModal={toggleModal} />
      </Modal>

    </View>
  )
}

export default GroupList