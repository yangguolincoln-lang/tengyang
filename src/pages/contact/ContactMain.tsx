import ContactInfo from './ContactInfo'
import MessageForm from './MessageForm'

/** 联系信息 + 留言表单主区块：左 40% 信息 / 右 60% 表单 */
export default function ContactMain() {
  return (
    <section className="bg-ivory-50 py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 md:px-12 lg:grid-cols-[40%_60%] lg:gap-14">
        <ContactInfo />
        <MessageForm />
      </div>
    </section>
  )
}
