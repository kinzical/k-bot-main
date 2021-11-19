import { botFacade, BotFacade } from './../../facades/Bot.facade';
import { ChatEvent } from "../enums/bot.enums";
import { QuestionVM } from './question.classes';


export class ChatPayload {
    // user: string[];
    // event: string;
    // question: QuestionVM;
    // data: {};
    // timeStamp: Date;
    // isEditing = false;
    // answerType: AVT_TYPE = AVT_TYPE.NONE;
    // errorMessages: ChatPayload[] = []
    // isSkipped: Boolean;

    // constructor(dictionary: any = {}, data: any = {}) {
    //     this.user = ["backend", "chat_engine"]
    //     this.event = dictionary?.event
    //     this.question = new QuestionVM(dictionary?.data)
    //     this.data = data
    //     this.timeStamp = new Date((dictionary?.time_stamp + "+0000") || "")
    //     this.isSkipped = false
    // }

    // static createChatPayload(event: ChatEvent, data: any = {}): ChatPayload {
    //     let chatPayload = new ChatPayload();
    //     chatPayload.event = event;
    //     chatPayload.data = data;
    //     return chatPayload
    // }

    // static createProcessedErrorPayload(dictionary: any = {}): ChatPayload {
    //     let chatPayload = new ChatPayload();
    //     chatPayload.event = dictionary?.event
    //     chatPayload.question.id = dictionary?.data?.question_id
    //     chatPayload.question.message = dictionary?.data?.response_message
    //     chatPayload.data = dictionary?.event
    //     chatPayload.timeStamp = new Date(dictionary?.time_stamp + "+0000" || "")
    //     return chatPayload
    // }

    // getReponsePayload() {

    //     let postData: any = { question_id: this.question.id }
    //     postData.response = this.question.response.data

    //     return {
    //         user: this.user,
    //         timestamp: this.question.response.timestamp.toISOString(),
    //         event: ChatEvent.ON_RESPONSE,
    //         room_id: botFacade.getRoomId(),
    //         data: postData,
    //         created_by: "frontend",
    //     }
    // }

    // getSkipQuestionPayload() {

    //     let postData: any = { question_id: this.question.id }

    //     return {
    //         user: this.user,
    //         timestamp: this.question.response.timestamp.toISOString(),
    //         event: ChatEvent.ON_SKIP_QUESTION,
    //         room_id: botFacade.getRoomId(),
    //         data: postData,
    //         created_by: "frontend",
    //     }
    // }

    // getParameters = () => {
        
    //     return {
    //         user: this.user,
    //         timestamp: new Date().toISOString(),
    //         event: this.event,
    //         room_id: botFacade.getRoomId(),
    //         data: this.data,
    //         created_by: "frontend",
    //     }
    // }

    // static getChatConnectPayload() {
    //     return this.createChatPayload(ChatEvent.ONC).getParameters()
    // }
}