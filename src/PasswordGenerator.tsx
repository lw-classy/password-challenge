import {css} from '@emotion/react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	Flex,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Spacer,
	Stack,
	Text,
	Tooltip,
	useToast,
} from '@chakra-ui/react';
import {useMemo, useState} from 'react';
import {CopyIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {generatePassword, lowercase, specialChars, uppercase} from './utils.ts';

function PasswordGenerator() {
	const toast = useToast();
	const [length, setLength] = useState(6);
	const [trigger, setTrigger] = useState(false);
	const [checkboxes, setCheckboxes] = useState({
		uppercase: true,
		lowercase: true,
		special: true,
	});
	const [show, setShow] = useState(true);

	const handleCheckboxes = (checkboxKey: 'uppercase' | 'lowercase' | 'special') => {
		const newCheckboxes = {...checkboxes};
		newCheckboxes[checkboxKey] = !checkboxes[checkboxKey];

		// We want that at least one checkbox is checked to generate a proper password
		if (Object.values(newCheckboxes).filter(Boolean).length > 0) {
			setCheckboxes(newCheckboxes);
		}
	};

	// Handle the length of the password
	const handleLength = (value: number) => {
		setLength(value);
	};

	const password = useMemo(() => {
		let charSet = '';
		if (checkboxes.uppercase) charSet += uppercase;
		if (checkboxes.lowercase) charSet += lowercase;
		if (checkboxes.special) charSet += specialChars;
		setTrigger(false);
		return generatePassword(length, charSet);
	}, [checkboxes, length, trigger]);

	const handleCopyClick = () => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				toast({
					title: 'Copied',
					description: 'Password was copied to clickboard',
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'bottom-right',
				});
			})
			.catch(err => toast({title: 'Failed to copy', description: `${err}`}));
	};

	return (
		<>
			<div css={style}>
				<Card css={CardStyle}>
					<CardHeader>
						<Heading>Passwort Generator</Heading>
					</CardHeader>
					<CardBody>
						<Stack>
							<InputGroup size='md'>
								<Input pr='4.5rem' type={show ? 'text' : 'password'} value={password} readOnly={true} />
								<InputRightElement width='4.5rem'>
									<Tooltip label={show ? 'Hide password' : 'Show password'} placement={'top'}>
										<IconButton
											aria-label={'View password'}
											size='sm'
											onClick={() => setShow(!show)}
											icon={show ? <ViewIcon /> : <ViewOffIcon />}
										></IconButton>
									</Tooltip>
									<Spacer />
									<Tooltip label={'Copy to clipboard'} placement={'top'}>
										<IconButton
											onClick={() => handleCopyClick()}
											colorScheme={'blue'}
											aria-label={'Copy to clipboard'}
											size={'sm'}
											icon={<CopyIcon />}
										></IconButton>
									</Tooltip>
									<Spacer />
								</InputRightElement>
							</InputGroup>
							<Spacer />
							<Slider aria-label='slider-ex-1' defaultValue={length} min={4} max={64} onChange={val => handleLength(val)}>
								<SliderTrack>
									<SliderFilledTrack />
								</SliderTrack>
								<Tooltip label={length} placement={'top'}>
									<SliderThumb />
								</Tooltip>
							</Slider>
							<Flex justifyContent={'space-between'}>
								<Text>Length of password: {length} characters</Text>
								<Flex gap={2}>
									<Checkbox isChecked={checkboxes.uppercase} onChange={() => handleCheckboxes('uppercase')}>
										Uppercase
									</Checkbox>
									<Checkbox isChecked={checkboxes.lowercase} onChange={() => handleCheckboxes('lowercase')}>
										Lowercase
									</Checkbox>
									<Checkbox isChecked={checkboxes.special} onChange={() => handleCheckboxes('special')}>
										Special Characters
									</Checkbox>
								</Flex>
							</Flex>

							<Button onClick={() => setTrigger(prv => !prv)}>Generate new password</Button>
						</Stack>
					</CardBody>
				</Card>
			</div>
		</>
	);
}

export default PasswordGenerator;

const style = css`
	width: 100%;
	height: 100vh;
	background-color: var(--chakra-colors-gray-300);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const CardStyle = css`
	width: 40vw;
`;
