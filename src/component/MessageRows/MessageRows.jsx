import { fromNow } from "../../js/util"

/**
 * @typedef {Object} Message
 * @prop {string} messageSid
 * @prop {string} from
 * @prop {string} to
 * @prop {string} body
 * @prop {Date} date
 * @prop {boolean} isRead
 */

/**
 * @param {Message} message
 * @returns {boolean}
 */
const isRead = message => message.isRead ?? false

/**
 * @param {Message} message
 * @returns {string}
 */
const isReadContent = message => (isRead(message) ? "bg-gray-200 text-gray-600" : "")

/**
 * @param {Message} message
 * @returns {string}
 */
const isReadHeader = message => (isRead(message) ? "text-gray-400" : "text-gray-500")

/**
 * @param {Message} message
 */
const MessageRow = message => (
  <div
    key={message.messageSid}
    className={`
    border-violet-200 border-b-2
    shadow-black
    hover:bg-violet-100 hover:cursor-pointer  hover:shadow-md hover:border-b-violet-400
    active:bg-violet-200 h-20 p-2 ${isReadContent(message)}`}
  >
    <div className={`text-xs mb-2 overflow-clip font-sans font-light ${isReadHeader(message)}`}>
      <span className="inline-block w-20">
        <b>Inbound</b>
      </span>
      <span className="inline-block w-32">
        <b>To:</b>
        {message.to}
      </span>
      <span className="inline-block w-36">
        <b>From:</b>
        {message.from}
      </span>
      <span className="hidden md:inline-block">{fromNow(message.date)}</span>
    </div>
    <div className="line-clamp-2">{message.body}</div>
  </div>
)

/**
 * @param {{messages: Array<Message>}} messages
 */
export const MessageRows = ({ messages }) => (
  <div className="border-2 border-b-0 border-violet-200">{messages.map(MessageRow)}</div>
)