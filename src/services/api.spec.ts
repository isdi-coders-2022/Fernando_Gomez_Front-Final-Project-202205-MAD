import { mockRoom, mockRoom2, mockUpdatedUser, mockUser, mockUser2, token } from "../utils/mocks";
import { ApiChat } from "./api";

describe("Given the api service", () => {
    describe("When we use the method signup", () => {
        test("Then should be render", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(
                    mockUser
                ),
            });
            const result = await new ApiChat().signup(mockUser);

            expect(fetch).toBeCalled();
            expect(result.name).toBe("name1");
        });
    });

    describe("When we use the method login", () => {
        test("Then should be render", async () => {
            
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await new ApiChat().login(
                mockUser._id
            );

            expect(fetch).toBeCalled();
            expect(result.name).toBe("name1");
        });
    });

    describe("When we use the method getAllRoomsByUser", () => {
        test("Then should be render", async () => {
            
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([
                    mockRoom, mockRoom2
                ]),
            });
            const result = await new ApiChat().getAllRoomsByUser(
                mockUser._id as string, token
            );

            expect(fetch).toBeCalled();
            expect(result[0].owner).toBe("id");
        });
    });

    describe("When we use the method getUserbyId", () => {
        test("Then should be render", async () => {
            
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await new ApiChat().getUserbyId(
                mockUser._id as string, token
            );

            expect(fetch).toBeCalled();
            expect(result.name).toBe("name1");
        });
    });

    describe("When we use the method getAllUsers", () => {
        test("Then should be render", async () => {
            
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([
                    mockUser, mockUser2
                ]),
            });
            const result = await new ApiChat().getAllUsers(
                mockUser._id as string, token
            );

            expect(fetch).toBeCalled();
            expect(result[0].name).toBe("name1");
        });
    });

    describe("When we use the method updateUser", () => {
        test("Then should be render", async () => {
            
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockUpdatedUser),
            });
            const result = await new ApiChat().updateUser(
                mockUser._id as string, token, mockUpdatedUser
            );

            expect(fetch).toBeCalled();
            expect(result.name).toBe("updated");
        });
    });
});
