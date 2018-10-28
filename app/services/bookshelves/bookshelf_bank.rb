module Bookshelves
  class BookshelfBank
    def initialize(inbound, outbound)
      @inbound = inbound
      @outbound = outbound
    end

    attr_accessor :inbound, :outbound

    def call
      binding.pry
      return if inbound == outbound
      adding_to_shelf = bookshelf(inbound)
      leaving_shelf = bookshelf(outbound)
      increment(adding_to_shelf)
      decrement(bookshelf(leaving_shelf))
    end

    private

    def increment(shelf)
      shelf.update(book_count: shelf.book_count + 1)
    end

    def decrement(shelf)
      shelf.update(book_count: shelf.book_count - 1)
    end

    def bookshelf(id)
      @_bookshelf ||= Bookshelf.find(id)
    end
  end
end
