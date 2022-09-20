import Author from 'App/Models/Author'

class AuthorHandler {
  public async processAuthor(authenticatedUser: Author): Promise<void> {
    let author = await Author.find(authenticatedUser.id)

    if (!author) {
      author = new Author()
      author.id = authenticatedUser.id
    }

    if (author.email !== authenticatedUser.email || author.name !== authenticatedUser.name) {
      author.email = authenticatedUser.email
      author.name = authenticatedUser.name

      await author.save()
    }
  }
}

export default new AuthorHandler()
