import { StyleSheet, Text, View,  Modal, TouchableOpacity, ScrollView  } from 'react-native'
import React, {useState} from 'react'



const FilterSide = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Show Popup</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.panel}>
                <View style={{alignItems: 'center'}}>
            <Text style={[styles.panelSubtitle, {color: '#222'}]}>{'Filter by'}</Text>
            </View>    
          <View style={{height: 410, borderColor: '#DDD', borderBottomWidth: 1, borderTopWidth: 1}}>
            <ScrollView>
            <Text style={[styles.TextStyle,{marginTop: 15}]}>Category</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#EAABAB'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Q&A</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#74A8C5'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Help?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#FA9D68'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Study Resources</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#CF87DF'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Exam Analysis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#F6F069'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Preparation Experiences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#51D855'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Share Your Results</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#70DECE'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Events/News</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#E55858'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Review Exam Experiences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#BCE37A'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Others</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.TextStyle,{marginTop: 15}]}>Post</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#9ACC1C'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Newest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#9ACC1C'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Hottest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#9ACC1C'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Liked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.panelButton, {backgroundColor: '#9ACC1C'}]}
                    onPress={() => {}}>
                    <Text style={[styles.panelButtonTitle]}>Commented</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, borderColor: '#DDD', borderTopWidth: 1, padding: 5}}>
                    <TouchableOpacity
                        style={[styles.panelButton, {width: 100}]}
                        onPress={() => {toggleModal()}}>
                        <Text style={[styles.panelButtonTitle, {fontWeight: '700'}]}>Ok</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.panelButton, {width: 100}]}
                        onPress={() => {toggleModal()}}>
                        <Text style={[styles.panelButtonTitle, {fontWeight: '700'}]}>Cancel</Text>
                    </TouchableOpacity>         
                </View>
            </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default FilterSide

const styles = StyleSheet.create({
    panel: {
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 20,
        width: '100%',
      },
      header: {
        backgroundColor: '#fff',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelSubtitle: {
        fontSize: 18,
        color: '#555',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
      },
      panelButtonTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#222',
      },
      TextStyle: {
        marginBottom: 5,
        fontSize: 15
      }
})