import axios from "axios";
import { chatServerAddress } from '../api/ServerAddress'

export const apiChat = axios.create({
    baseURL: chatServerAddress
});
