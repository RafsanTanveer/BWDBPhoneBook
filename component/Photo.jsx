import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useState } from 'react';

import { Images } from '../utility/Images'
import { width, height } from '../utility/ScreenDimensions'
import { ThemeContext } from '../context/ThemeContext'
import CameraOrGalleryModal from './modalComponents/CameraOrGalleryModal';

const Photo = ({ pht, updateBiodata }) => {

    const [isModalVisible, setModalVisible] = useState(false);


    const { currentTheme } = useContext(ThemeContext);
    const toggleModal = (isVisible, type, heading) => {
        // setphnOrMsg(type)
        // setmodalHeading(heading)
        setModalVisible(isVisible);
    };

  return (
      <View style={{ flexDirection: 'column' }} >
          {

              pht ?
                  <Image style={{ height: width * .35, width: width * .25 }} source={{ uri: "data:image/jpeg;base64," + pht }} /> :
                  <Image style={{ height: 100, width: 90, borderColor: 'purple', borderWidth: 1 }} source={Images['placeHolderImg']} ></Image>

          }
          <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={{ flex: 1 }} >

              </View>
              <TouchableOpacity
                  // onPress={() => { selectImage(true) }}
                  onPress={() => { toggleModal(true) }}
                  style={{
                      right: 0,
                      margin: 3,
                      backgroundColor: `${currentTheme}`,
                      borderRadius: height * .005,
                      paddingVertical: .5,
                      paddingHorizontal: 5,
                      elevation: 2,
                      height: height * .022,
                      justifyContent:'center'
                  }} >
                  {/* <Image style={{ height: width * .045, width: width * .045, }} source={Images['cngPh']} ></Image> */}
                  <Text style={{ color: 'white', fontSize: height * .015, fontStyle: 'italic' }} >Update</Text>

              </TouchableOpacity>

              <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  onRequestClose={() => toggleModal(true)}
              >
                  <CameraOrGalleryModal number={''} toggleModal={toggleModal} type={''} heading={'Select Photo'} refreshList={updateBiodata} />

              </Modal>

          </View>




      </View>
  )
}

export default Photo