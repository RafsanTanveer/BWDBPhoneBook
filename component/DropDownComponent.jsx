import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext, useCallback, memo } from "react";

import DropDownPicker from 'react-native-dropdown-picker'

const DropDownComponent = ({ tempDist, isOpen, setIsOpen, currentDistValue, setCurrentDistValue, sortByDistrict }) => {

    const sortDistrct = () => { sortByDistrict() }
    const isOpenSet = () => { setIsOpen(!isOpen) }
    const valueSet = () => { setCurrentDistValue() }

  return (
      <View style={{ width: 160, marginRight: 10, }}>
          <View >
              <DropDownPicker
                  items={tempDist}
                  open={isOpen}
                  setOpen={() => isOpenSet()}
                  value={currentDistValue}
                  setValue={valueSet}
                  maxHeight={450}
                  placeholder="Select Office Location"
                  onChangeValue={() => sortDistrct()}
              />
          </View>

      </View>
  )
}


export default memo(DropDownComponent);

const styles = StyleSheet.create({})
