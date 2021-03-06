import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const Label = styled.label`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 16px;
`

export const Input = styled.input`
  box-sizing: border-box;
  font-size: 16px;
  min-width: 150px;
  padding: .65em;
  border-radius: 2px;
  box-shadow: inset 0 0px 0px rgba(255,255,255, 0);
  border: solid 1px rgba(35,31,32, 0.3);
  color: inherit;
  outline: none;
  &:placeholder {
    color: ${({theme}) => theme.colors.lightMediumGray};
    font-family: ${({theme}) => theme.fonts.light};
  }
`


export const Textarea = styled.textarea`
  box-sizing: border-box;
  padding: .65em;
  border-radius: 2px;
  box-shadow: inset 0 0px 0px rgba(255,255,255, 0);
  border: solid 1px rgba(35,31,32, 0.3);
  color: inherit;
  outline: none;
  width: 100%;
  font-size: 16px;
  min-height: 120px;
`

export const Select = styled.select`
  width: 200px;
  height: ${({multiple}) => (multiple) ? 'auto' : '20px'};
  max-height: 100px;
  outline: none;
  background-color: ${({theme}) => theme.colors.white};
`

const CheckboxInput = styled.input`

`



export const Checkbox = (props) => {
  return (
    <Row>
      <Label>
        {props.label}
      </Label>
      <CheckboxInput
        type={"checkbox"}
        {...props}
      />
    </Row>
  )
}


const Row =styled.div`
  display: flex;
  align-items: center;
`

export const Option = styled.option`
  font-size: 16px;

`
