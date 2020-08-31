import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F7'
    },
    teacherList:{
        marginTop:-40,
    },
    searchForm:{
        marginBottom:24
    },
    label: {
        fontFamily:'Poppins_400Regular',
        color:'#D4C2FF'
    },
    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent:'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputBlock: {
        width: '48%'
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#04D361',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    submitButtonText: {
        color:'#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 14,
    }
});
export default style;