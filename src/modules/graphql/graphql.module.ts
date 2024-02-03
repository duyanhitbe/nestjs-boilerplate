import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';

@Module({
	imports: [
		NestGraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			autoSchemaFile: true,
			formatError: (error) => {
				const originalError = error.extensions?.originalError;

				if (!originalError) {
					return {
						message: error.message,
						code: error.extensions?.code
					};
				}
				return {
					message: originalError['message'],
					code: error.extensions?.code
				};
			}
		})
	]
})
export class GraphQLModule {}
