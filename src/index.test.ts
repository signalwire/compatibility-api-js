import twilio, { Twilio } from '../lib'
import { RestClient } from '../'

describe('It generate LaML', () => {
  const FROM = '+11111111119'

  it('should generate LaML', () => {
    const response = new RestClient.LaML.VoiceResponse()
    response.dial({ callerId: FROM }, '+11111111111')
    expect(response.toString()).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Dial callerId="${FROM}">+11111111111</Dial></Response>`
    )
  })

  it('should generate LaML with <AI>', () => {
    const response = new RestClient.LaML.VoiceResponse();
    const connect = response.connect();
    const ai = connect.ai();
    ai.setEngine('gcloud');

    const prompt = ai.prompt('prompt1')
    prompt.setTemperature(0.2)
    
    ai.postPrompt('prompt2');

    expect(response.toString()).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><AI engine="gcloud"><Prompt temperature="0.2">prompt1</Prompt><PostPrompt>prompt2</PostPrompt></AI></Connect></Response>`
    )
  })

  it('LaML to receive a fax', () => {
    const response = new RestClient.LaML.FaxResponse()
    response.receive({ action: '/receive/fax' })
    expect(response.toString()).toEqual(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Receive action="/receive/fax"/></Response>'
    )
  })

  it('LaML to reject a fax', () => {
    const response = new RestClient.LaML.FaxResponse()
    response.reject()
    expect(response.toString()).toEqual(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Reject/></Response>'
    )
  })
})

describe('It is constructable', () => {
  const client = twilio('AC', 'token', {})
  const twilioProperties = Object.getOwnPropertyDescriptors(
    Object.getPrototypeOf(client)
  )

  it('should expose all the properties', () => {
    const client = RestClient('a', 'b', {
      signalwireSpaceUrl: 'example.domain.com',
    })
    Object.keys(twilioProperties).forEach((prop) => {
      expect(client[prop as keyof typeof Twilio]).toBeDefined()
    })
  })

  it('should read the spaceUrl from SIGNALWIRE_SPACE_URL variable', () => {
    process.env.SIGNALWIRE_SPACE_URL = 'example.domain.com'

    const client = RestClient('a', 'b')
    Object.keys(twilioProperties).forEach((prop) => {
      expect(client[prop as keyof typeof Twilio]).toBeDefined()
    })

    delete process.env.SIGNALWIRE_SPACE_URL
  })

  it('should read the spaceUrl from SIGNALWIRE_API_HOSTNAME variable', () => {
    process.env.SIGNALWIRE_API_HOSTNAME = 'example.domain.com'

    const client = RestClient('a', 'b')
    Object.keys(twilioProperties).forEach((prop) => {
      expect(client[prop as keyof typeof Twilio]).toBeDefined()
    })

    delete process.env.SIGNALWIRE_API_HOSTNAME
  })
})
