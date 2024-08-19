import {ChakraProvider} from '@chakra-ui/react';
import PasswordGenerator from './PasswordGenerator.tsx';

function App() {
	return (
		<>
			<ChakraProvider>
				<PasswordGenerator />
			</ChakraProvider>
		</>
	);
}

export default App;
