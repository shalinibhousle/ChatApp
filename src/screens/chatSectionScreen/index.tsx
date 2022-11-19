import { Icon } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { AuthContext, HeaderBar, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS } from "../../constants";
import { docId, getMessages, onSend } from "../../utils";


const ChatSectionScreen = ({ navigation, route }: any) => {
    const { user }: any = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const { uid, name, status } = route?.params || {};

    useEffect(() => {
        const docid = docId(uid, user);
        getMessages(setMessages, docid);
    }, []);


    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                            <HeaderBar isBack={false} headerText={name} extraProps={{ status }} onTitleCallback={() => navigation.goBack()} />
                            <GiftedChat
                                messages={messages}
                                onSend={text => onSend(text, setMessages, uid, user)}
                                user={{
                                    _id: uid,
                                }}
                                renderSend={(props) => {
                                    const { text, messageIdGenerator, user, onSend }: any = props
                                    return (
                                        <TouchableOpacity
                                            disabled={!(text && onSend)}
                                            onPress={
                                                () => {
                                                    if (text && onSend) {
                                                        onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true);
                                                    }
                                                }
                                            } style={{ marginHorizontal: 16 }}>
                                            <Icon {...props} name={'send'} pack={'feather'} size={32} color={COLORS.blue} style={{ height: 32, width: 32, color: COLORS.blue }} />
                                        </TouchableOpacity>
                                    )
                                }}
                                renderBubble={(props) => {
                                    return <Bubble
                                        {...props}
                                        wrapperStyle={{
                                            right: {
                                                backgroundColor: COLORS.blue,
                                            }
                                        }}
                                    />
                                }}
                                renderInputToolbar={(props) => {
                                    return <InputToolbar {...props}
                                        containerStyle={{ borderTopWidth: 1.5, borderTopColor: COLORS.blue }}
                                        textInputStyle={{ color: COLORS.black }}
                                    />
                                }}

                            />
                        </View>
                    }
                />
            }
        />
    )
}

export default ChatSectionScreen;