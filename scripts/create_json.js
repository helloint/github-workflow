const { exec } = require('child_process');

const main = async () => {
	try {
		const timestamp= Math.floor(Date.now() / 1000);
		const file= `${process.env.GITHUB_RUN_ID}_${timestamp}.json`;
		console.log(`Creating file: ${file}`);
		const json = {
			build_status: process.env.BUILD_STATUS,
			ci: 'GITHUB',
			ci_build_id: process.env.GITHUB_RUN_ID,
		};
		console.log(`File content: \r\n${JSON.stringify(json)}`);
		exec(`echo '${JSON.stringify(json)}' > ${file}`);
		exec(`echo "filename=${file}" >> $GITHUB_OUTPUT`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
