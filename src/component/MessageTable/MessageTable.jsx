import { toDateString } from "../MessageCard/MessageCard"

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
 */
export const MessageRow = message => (
  <tr key={message.messageSid} className="h-12 border hover:bg-violet-100 hover:cursor-pointer">
    <td className="p-2 border-r border-violet-200">{message.to}</td>
    <td className="p-2 border-r border-violet-200">{message.from}</td>
    <td className="p-2 border-r border-violet-200 hidden md:table-cell">{toDateString(message.date)}</td>
    <td className="p-2 truncate">{message.body}</td>
  </tr>
)

/**
 * @param {{messages: Array<Message>}} messages
 */
export const MessageTable = ({ messages }) => (
  <table className="table-fixed border-violet-200 w-full">
    <thead className="bg-violet-200 h-6">
      <tr>
        <th className="w-32">To</th>
        <th className="w-32">From</th>
        <th className="w-32 hidden md:table-cell">Date</th>
        <th className="">Message</th>
      </tr>
    </thead>
    <tbody>{messages.map(MessageRow)}</tbody>
  </table>
)